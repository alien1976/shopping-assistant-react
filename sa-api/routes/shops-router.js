const express = require('express');
const sendError = require('../utils').sendError;
const replaceId = require('../utils').replaceObjectId;
const validateShop = require('../utils').validateShop;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const verifyToken = require('./verify-token');
const verifyRole = require('./verify-role');

const router = express.Router();
const SHOPS_COLLECTION = 'shops';
const SHOP_BRANDS_COLLECTION = 'shopBrands';

router.get('/', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const shops = await db.collection(SHOPS_COLLECTION).find().toArray();

        res.json(shops.map((el) => {
            replaceId(el);
            return el;
        }));
    } catch (err) {
        sendError(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const params = req.params;
    const shopId = req.params.id;
    const mongoId = new ObjectID(shopId)
    const db = req.app.locals.db;

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const shop = await db.collection(SHOPS_COLLECTION).findOne({ _id: mongoId });

        if (!shop) {
            sendError(req, res, 404, `Shop with ID=${shopId} does not exist`);
            return;
        }

        replaceId(shop)

        res.json(shop);
    } catch (errors) {
        sendError(req, res, 400, `Invalid shop data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

const updateShopBrand = async (shop, db) => {
    const shopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: new ObjectID(shop.shopBrandId) });
    if (!shopBrand) return false;

    shopBrand.shopsIds.push(shop.id);

    const dbRes = await db.collection(SHOP_BRANDS_COLLECTION).updateOne({ _id: new ObjectID(shopBrand.id) }, { $set: shopBrand })

    if (!dbRes.result.ok) return false;

    return true;
}

const removeShopFromShopBrand = async (shop, db) => {
    const shopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: new ObjectID(shop.shopBrandId) });
    if (!shopBrand) return false;

    const idIndex = shopBrand.shopsIds.indexOf(shop.id);
    if (idIndex === -1) return false;
    shopBrand.shopsIds.splice(idIndex, 1);

    const dbRes = await db.collection(SHOP_BRANDS_COLLECTION).updateOne({ _id: new ObjectID(shopBrand.id) }, { $set: shopBrand })

    if (!dbRes.result.ok) return false;

    return true;
}

router.post('/', verifyToken, verifyRole(['Admin', 'Shop Owner', 'Shop Manager']), async (req, res) => {
    const db = req.app.locals.db;
    const shop = req.body;

    if (!await validateShop(shop, req, res)) return;

    if (!shop.map) shop.map = '{}';
    if (!shop.mapEntryPoint) shop.mapEntryPoint = '';
    if (!shop.mapImage) shop.mapImage = '';
    if (!shop.shopGoogleMapsSrc) shop.shopGoogleMapsSrc = '';

    const isShopExists = await db.collection(SHOPS_COLLECTION).findOne({ address: shop.address });
    if (isShopExists) {
        sendError(req, res, 400, `Shop  ${shop.name} with address: ${shop.address} already exists`)
        return;
    }

    try {
        const dbRes = await db.collection(SHOPS_COLLECTION).insertOne(shop)

        if (!dbRes.result.ok || dbRes.insertedCount !== 1) {
            sendError(req, res, 500, `Unable to create shop  ${shop.name}`)
        }

        replaceId(shop);
        shop.id = shop.id.toString()

        if (!await updateShopBrand(shop, db)) {
            sendError(req, res, 500, `Unable to update shop brand with ID=${shop.shopBrandId}`)
            return;
        }

        res.status(201).location(`/shops/${shop.id}`).json(shop);
    } catch (err) {
        sendError(req, res, 500, `Unable to create shop  ${shop.name}`)
    }
});

router.put('/:id', verifyToken, verifyRole(['Admin', 'Shop Owner', 'Shop Manager']), async (req, res) => {
    const shopId = req.params.id;
    const mongoId = new ObjectID(shopId)
    const db = req.app.locals.db;

    const oldShop = await db.collection(SHOPS_COLLECTION).findOne({ _id: mongoId });

    if (!oldShop) {
        sendError(req, res, 404, `Shop with ID=${shopId} does not exist`);
        return;
    }

    const shop = req.body;

    if (oldShop._id.toString() !== shop.id) {
        sendError(req, res, 400, `Shop ID=${shop.id} does not match URL ID=${shopId}`);
        return;
    }

    if (!await validateShop(shop, req, res)) return;

    //The shop name is updated then check for the new name existence
    if (oldShop.address !== shop.address) {
        const isShopExists = await db.collection(SHOPS_COLLECTION).findOne({ address: shop.address });
        if (isShopExists) {
            sendError(req, res, 400, `Shop address: ${shop.address} already exists`)
            return;
        }
    }

    replaceId(shop)
    delete shop._id;

    if (oldShop.shopBrandId !== shop.shopBrandId) {
        replaceId(oldShop)
        oldShop.id = oldShop.id.toString()
        if (!await removeShopFromShopBrand(oldShop, db)) {
            sendError(req, res, 500, `Unable to update shop brand with ID=${oldShop.shopBrandId}`)
            return;
        }

        if (!await updateShopBrand(shop, db)) {
            sendError(req, res, 500, `Unable to update shop brand with ID=${shop.shopBrandId}`)
            return;
        }
    }

    try {
        const r = await db.collection(SHOPS_COLLECTION).updateOne({ _id: new ObjectID(shopId) }, { $set: shop });

        if (r.result.ok) {
            replaceId(shop)
            res.json(shop);
        } else {
            sendError(req, res, 500, `Unable to update shop  ${shop.id}: ${shop.name}`, err);
        }
    } catch (err) {
        sendError(req, res, 500, `Unable to update shop  ${shop.id}: ${shop.name}`, err);
    }
});

router.delete('/:id', verifyToken, verifyRole(['Admin', 'Shop Owner', 'Shop Manager']), async (req, res) => {
    const params = req.params;
    const shopId = req.params.id;
    const db = req.app.locals.db;
    const mongoId = new ObjectID(shopId)

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const oldShop = await db.collection(SHOPS_COLLECTION).findOne({ _id: mongoId });

        if (!oldShop) {
            sendError(req, res, 404, `Shop with ID=${shopId} does not exist`);
            return;
        }

        const r = await db.collection(SHOPS_COLLECTION).deleteOne({ _id: mongoId });

        if (r.result.ok && r.deletedCount === 1) {
            replaceId(oldShop)
            oldShop.id = oldShop.id.toString()
            if (!await removeShopFromShopBrand(oldShop, db)) {
                sendError(req, res, 500, `Unable to update shop brand with ID=${oldShop.shopBrandId}`)
                return;
            }

            res.json(oldShop);
        } else {
            sendError(req, res, 500, `Unable to delete shop  ${oldShop.id}: ${oldShop.name}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid shop data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;