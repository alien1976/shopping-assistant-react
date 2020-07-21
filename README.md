# Shopping Assistant

![](src/assets/favicon/android-chrome-192x192.png)

**Welcome to Shopping Assistant!**

## What is Shopping Assistant and what problem it solves

Every one of us had a situation where some products in the shop could not be found. Then some workers from the store will come to help us to find them but sometimes this is a hard task for them too. This assumes that you need to walk around the shop and lose your time finding the specific products and it may turn out that these products are not available in this store.

This web application has been created to help people solving this kind of problem. You can build a list of products and then the shortest path in the shop will be generated for you. This will eliminate searching for the product location in the shop when you don't know its exact location. Also, it may speed up the shopping process and experience from shopping at all.

## What you can do with this web application

* You can view information for all the shops that are saved in the application system like shop name, shop address, shop location that is shown in embedded google maps, all the available shop products. Each shop is unique and has been classified with a specific shop brand.
* You can view information for all the products that are saved in the application system. For each product, you can find information about: product name, product price, product location related to the specific product shop map.
* You can easily search from a specific shop or product with the filter and search section in the application.
* Each product can be added to the shopping cart.
* Each product can be added to favorites if the user has been logged in with its account to the application.
* You can start the shopping process from the app - **This is the main feature of the application**.
    * When you set all the products that you want to buy in the cart then you can continue with shopping.
    * When you navigate to the shopping cart then a map of the current shop with all the product locations in the list will be generated for you.
    * Also the shortest path on the map will be shown based on all the products that are not yet reached.
    * You will see two lists with products - one with the rest products to be reached out and one with the products that you have reached out already. You can toggle a product between these two lists and this operation will regenerate the shortest path in the map every time it is performed.

**User roles**

There are five different user roles in this application - Admin, Shop owner, Shop manager, User, and Anonymous user (when the user is not logged in).
* *Admins* - Has a User role + can manage:
    * All the users - Shop owners, Shop
    * All the products
    * All the shops
        * The shop map can be managed with the shop map editor added to the application. Also, there are options for exporting/importing a shop map.
* *Shop owners* **(Their role is not yet implemented)** - Has a User role + can manage:
    * All the shops that are owned by them
    * All the shop managers for their shops
    * All the products within their shops
* *Shop manager* **(Their role is not yet implemented)** - Has a User role + can manage:
    * The shops that it manages.
    * The products within these shops.
* *User* - can manage:
    * Its favorite products - will be saved on the server DB not temporary.
    * Its cart - will be saved on the server DB not temporary.
* *Anonymous user* - can manage:
    * Its cart - will be temporarily saved in the browser cookies.
## How to run the application

Because this application is not hosted anywhere you need to run it locally on your PC.

### Pre-run steps

Within the first application run, the database might be empty and nothing will be loaded. To fix this you can check the `.json` files inside `./src/mock-db-data` and import them to MongoDB for example using MongoDB Compass (the database name should be - ShoppingAssistant and all the collections inside this DB should be with names - the `.json` files).

### Debug mode
1. Clone the repo and navigate to the repo folder
2. Open a new terminal inside the repo folder and type `npm run start:db`
3. Open a new terminal inside the repo folder and type `npm run start:server`
4. Open a new terminal inside the repo folder and type `npm run start`

The application will be served on http://localhost:3000 so you can navigate there with a browser and check the application.

### Production mode
1. Clone the repo and navigate to the repo folder
2. Open a new terminal inside the repo folder and type `npm run start:db`
3. Open a new terminal inside the repo folder and type `npm run start:server`
4. Open a new terminal inside the repo folder and type `npm run build` - to build the application in production.
5. Navigate to `${Repo folder}/build` and open a terminal there
6. If you don't have npm http-server module as a global one then install it first with `npm install -g http-server`
7. Run `http-server` command in the terminal - the output might be something similar
```
    Starting up http-server, serving ./
    Available on:
    http://x.x.x.x:8080
    http://x.x.x.x:8080
    Hit CTRL-C to stop the server
```
8. Open the given address from the http-server in the browser and check the result.