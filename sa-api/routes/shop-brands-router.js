const express = require('express');
const sendError = require('../utils').sendError;
const replaceId = require('../utils').replaceObjectId;
const validateShopBrand = require('../utils').validateShopBrand;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();
const SHOP_BRANDS_COLLECTION = 'shopBrands';

router.get('/', async (req, res) => {
    const db = req.app.locals.db;

    try {
        const shopsBrands = await db.collection(SHOP_BRANDS_COLLECTION).find().toArray();

        res.json(shopsBrands.map((el) => {
            replaceId(el);
            return el;
        }));
    } catch (err) {
        sendError(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const params = req.params;
    const shopBrandId = req.params.id;
    const mongoId = new ObjectID(shopBrandId)
    const db = req.app.locals.db;

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const shopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: mongoId });

        if (!shopBrand) {
            sendError(req, res, 404, `Shop brand with ID=${shopBrandId} does not exist`);
            return;
        }

        replaceId(shopBrand)

        res.json(shopBrand);
    } catch (errors) {
        sendError(req, res, 400, `Invalid shop brand data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.post('/', async (req, res) => {
    const db = req.app.locals.db;
    const shopBrand = req.body;

    if (!await validateShopBrand(shopBrand, req, res)) return;

    if (!shopBrand.shopsIds) shopBrand.shopsIds = [];
    if (!shopBrand.productsIds) shopBrand.productsIds = [];

    const isShopBrandExists = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ name: shopBrand.name });
    if (isShopBrandExists) {
        sendError(req, res, 400, `Shop brand: ${shopBrand.name} already exists`)
        return;
    }

    try {
        const dbRes = await db.collection(SHOP_BRANDS_COLLECTION).insertOne(shopBrand)

        if (!dbRes.result.ok || dbRes.insertedCount !== 1) {
            sendError(req, res, 500, `Unable to create shop brand: ${shopBrand.name}`)
        }
        replaceId(shopBrand);
        res.status(201).location(`/shop-brands/${shopBrand.id}`).json(shopBrand);
    } catch (err) {
        sendError(req, res, 500, `Unable to create shop brand: ${shopBrand.name}`)
    }
});

router.put('/:id', async (req, res) => {
    const shopBrandId = req.params.id;
    const mongoId = new ObjectID(shopBrandId)
    const db = req.app.locals.db;

    const oldShopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: mongoId });

    if (!oldShopBrand) {
        sendError(req, res, 404, `Shop brand with ID=${shopBrandId} does not exist`);
        return;
    }

    const shopBrand = req.body;

    if (oldShopBrand._id.toString() !== shopBrand.id) {
        sendError(req, res, 400, `Shop brand ID=${shopBrand.id} does not match URL ID=${shopBrandId}`);
        return;
    }

    if (!await validateShopBrand(shopBrand, req, res)) return;

    //The shop brand name is updated then check for the new name existence
    if (oldShopBrand.name !== oldShopBrand.name) {
        const isShopBrandExists = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ name: shopBrand.name });
        if (isShopBrandExists) {
            sendError(req, res, 400, `Shop brand name: ${shopBrand.name} already exists`)
            return;
        }
    }

    replaceId(shopBrand)
    delete shopBrand._id;

    try {
        const r = await db.collection(SHOP_BRANDS_COLLECTION).updateOne({ _id: new ObjectID(shopBrandId) }, { $set: shopBrand });

        if (r.result.ok) {
            replaceId(shopBrand)
            res.json(shopBrand);
        } else {
            sendError(req, res, 500, `Unable to update shop brand: ${shopBrand.id}: ${shopBrand.name}`, err);
        }
    } catch (err) {
        sendError(req, res, 500, `Unable to update shop brand: ${shopBrand.id}: ${shopBrand.name}`, err);
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    const shopBrandId = req.params.id;
    const db = req.app.locals.db;
    const mongoId = new ObjectID(shopBrandId)

    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
        const oldShopBrand = await db.collection(SHOP_BRANDS_COLLECTION).findOne({ _id: mongoId });

        if (!oldShopBrand) {
            sendError(req, res, 404, `Shop brand with ID=${shopBrandId} does not exist`);
            return;
        }

        const r = await db.collection(SHOP_BRANDS_COLLECTION).deleteOne({ _id: mongoId });

        if (r.result.ok && r.deletedCount === 1) {
            replaceId(oldShopBrand)
            res.json(oldShopBrand);
        } else {
            sendError(req, res, 500, `Unable to delete shop brand: ${oldShopBrand.id}: ${oldShopBrand.name}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid shop brand data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;