const express = require('express');
const sendError = require('../utils').sendError;
const replaceId = require('../utils').replaceObjectId;
const validateProduct = require('../utils').validateProduct;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();
const PRODUCTS_COLLECTION = 'products';
const SHOP_BRANDS_COLLECTION = 'shopBrands';

router.get('/', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const products = await db.collection(PRODUCTS_COLLECTION).find().toArray();

        res.json(products.map((el) => {
            replaceId(el);
            return el;
        }));
    } catch (err) {
        sendError(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const params = req.params;
    const productId = req.params.id;
    const mongoId = new ObjectID(productId)
    const db = req.app.locals.db;

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const product = await db.collection(PRODUCTS_COLLECTION).findOne({ _id: mongoId });

        if (!product) {
            sendError(req, res, 404, `Product with ID=${productId} does not exist`);
            return;
        }

        replaceId(product)

        res.json(product);
    } catch (errors) {
        sendError(req, res, 400, `Invalid product data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

const updateShopBrand = async (product, db) => {
    const shopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: new ObjectID(product.shopBrandId) });
    if (!shopBrand) return false;

    shopBrand.productsIds.push(product.id);

    const dbRes = await db.collection(SHOP_BRANDS_COLLECTION).updateOne({ _id: new ObjectID(shopBrand.id) }, { $set: shopBrand })

    if (!dbRes.result.ok) return false;

    return true;
}

const removeProductFromShopBrand = async (product, db) => {
    const shopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: new ObjectID(product.shopBrandId) });
    if (!shopBrand) return false;

    const idIndex = shopBrand.productsIds.indexOf(product.id);
    if (idIndex === -1) return false;
    shopBrand.productsIds.splice(idIndex, 1);

    const dbRes = await db.collection(SHOP_BRANDS_COLLECTION).updateOne({ _id: new ObjectID(shopBrand.id) }, { $set: shopBrand })

    if (!dbRes.result.ok) return false;

    return true;
}

router.post('/', async (req, res) => {
    const db = req.app.locals.db;
    const product = req.body;

    if (!await validateProduct(product, req, res)) return;

    if (!product.coordinates) product.coordinates = '';

    const isProductExists = await db.collection(PRODUCTS_COLLECTION).findOne({ name: product.name, shopId: product.shopId });
    if (isProductExists) {
        sendError(req, res, 400, `Product  ${product.name} with shop id: ${product.shopId} already exists`)
        return;
    }

    try {
        const dbRes = await db.collection(PRODUCTS_COLLECTION).insertOne(product)

        if (!dbRes.result.ok || dbRes.insertedCount !== 1) {
            sendError(req, res, 500, `Unable to create product  ${product.name}`)
        }

        replaceId(product);
        product.id = product.id.toString()

        if (!await updateShopBrand(product, db)) {
            sendError(req, res, 500, `Unable to update product's shop brand with ID=${product.shopBrandId}`)
            return;
        }

        res.status(201).location(`/products/${product.id}`).json(product);
    } catch (err) {
        sendError(req, res, 500, `Unable to create product  ${product.name}`)
    }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const mongoId = new ObjectID(productId)
    const db = req.app.locals.db;

    const oldProduct = await db.collection(PRODUCTS_COLLECTION).findOne({ _id: mongoId });

    if (!oldProduct) {
        sendError(req, res, 404, `Product with ID=${productId} does not exist`);
        return;
    }

    const product = req.body;

    if (oldProduct._id.toString() !== product.id) {
        sendError(req, res, 400, `Product ID=${product.id} does not match URL ID=${productId}`);
        return;
    }

    if (!await validateProduct(product, req, res)) return;

    //The product name is updated then check for the new name existence
    if (oldProduct.name !== product.name) {
        const isProductExists = await db.collection(PRODUCTS_COLLECTION).findOne({ name: product.name, shopId: product.shopId });
        if (isProductExists) {
            sendError(req, res, 400, `Product name: ${product.name} already exists`)
            return;
        }
    }

    replaceId(product)
    delete product._id;

    if (oldProduct.shopBrandId !== product.shopBrandId) {
        replaceId(oldProduct)
        oldProduct.id = oldProduct.id.toString()
        if (!await removeProductFromShopBrand(oldProduct, db)) {
            sendError(req, res, 500, `Unable to update product's shop brand with ID=${oldProduct.shopBrandId}`)
            return;
        }

        if (!await updateShopBrand(product, db)) {
            sendError(req, res, 500, `Unable to update product's shop brand with ID=${product.shopBrandId}`)
            return;
        }
    }

    try {
        const r = await db.collection(PRODUCTS_COLLECTION).updateOne({ _id: new ObjectID(productId) }, { $set: product });

        if (r.result.ok) {
            replaceId(product)
            res.json(product);
        } else {
            sendError(req, res, 500, `Unable to update product  ${product.id}: ${product.name}`, err);
        }
    } catch (err) {
        sendError(req, res, 500, `Unable to update product  ${product.id}: ${product.name}`, err);
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    const productId = req.params.id;
    const db = req.app.locals.db;
    const mongoId = new ObjectID(productId)

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const oldProduct = await db.collection(PRODUCTS_COLLECTION).findOne({ _id: mongoId });

        if (!oldProduct) {
            sendError(req, res, 404, `Product with ID=${productId} does not exist`);
            return;
        }

        const r = await db.collection(PRODUCTS_COLLECTION).deleteOne({ _id: mongoId });

        if (r.result.ok && r.deletedCount === 1) {
            replaceId(oldProduct)
            oldProduct.id = oldProduct.id.toString()
            if (!await removeProductFromShopBrand(oldProduct, db)) {
                sendError(req, res, 500, `Unable to update product's shop brand with ID=${oldProduct.shopBrandId}`)
                return;
            }

            res.json(oldProduct);
        } else {
            sendError(req, res, 500, `Unable to delete product  ${oldProduct.id}: ${oldProduct.name}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid product data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;