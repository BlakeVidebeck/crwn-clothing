import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import compression from 'compression'
import enforce from 'express-sslify'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
const PORT = process.env.PORT || 5000

app.use(compression())
app.use(express.json())

app.use(cors())

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }))
	app.use(express.static(path.join(__dirname, 'client/build')))

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

app.post('/payment', (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: 'usd',
	}

	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr })
		} else {
			res.status(200).send({ success: stripeRes })
		}
	})
})

app.get('/service-worker.js', (req, res) => {
	res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})

app.listen(PORT, (error) => {
	if (error) throw error
	console.log(`Server running on PORT: ${PORT}`)
})
