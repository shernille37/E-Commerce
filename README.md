# ProShop E-Commerce Platform

## Features

- Shopping Cart
- Product reviews and ratings
- Product pagination
- Product search feature
- Image Upload with Cloudinary
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Checkout process (shipping, payment method, etc)
- Payment with Stripe
- Database seeder (products & users)


## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a Stripe account and obtain your `Client ID and SecretID` - [Stripe](https://stripe.com/)
- Create a Cloudinary account and obtain you `API Key and API Secret` - [Cloudinary](https://cloudinary.com)

Add a `.env` file in the `frontend/` and add the following

```
NODE_ENV=development
PORT=5000
MONGO_URI= YOUR MONGO URI
JWT_SECRET= YOUR JWT SECRET
STRIPE_SECRET_KEY= YOUR STRIPE SECRET KEY
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
CLOUDINARY_NAME= YOUR CLOUDINARY NAME
CLOUDINARY_API_KEY= YOUR CLOUDINARY API KEY
CLOUDINARY_API_SECRET= YOUR CLOUDINARY API SECRET
PAGINATION_LIMIT= YOUR PAGINATION LIMIT

```

Add a `.env` file in the root and add the following
```
REACT_APP_STRIPE_CLIENT_KEY= YOUR STRIPE CLIENT KEY
```

- You can generate the `JWT_SECRET` with the following command:
```bash
openssl rand -base64 32
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```




