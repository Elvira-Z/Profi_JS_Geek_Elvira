import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';
import { get } from "http";
import { count } from "console";

const BASKET = './public/basket_goods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readBasket = () => readFile(BASKET, 'utf-8')
    .then((basketFile) => {
        return JSON.parse(basketFile)
    })

const readGoods = () => readFile(GOODS, 'utf-8')
    .then((basketFile) => {
        return JSON.parse(basketFile)
    })

function getReformBasket() {
    return Promise.all([
        readBasket(),
        readGoods()
    ]).then(([basketList, goodsList]) => {
        const result = basketList.map((basketItem) => {
            const goodsItem = goodsList.find(({ id_product: _goodsId }) => {
                return _goodsId === basketItem.id_product
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        })
        return result

    })
}

app.post('/basket', (res, req) => {

    readBasket().then((goodsList) => {
        const basketItem = goodsList.find(({ id_product: _id }) => _id === res.body.id);
        if (!basketItem) {
            goodsList.push({
                _id: res.body.id,
                count: 1,
            })
        } else {
            goodsList = goodsList.map((basketItem) => {
                if (basketItem.id_product === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(goodsList)).then(() => {
            return getReformBasket()
        }).then((result) => {
            req.send(result)
        })
    })

})

/*app.delete('/basket', (res, req) => {

    readBasket().then((goodsList) => {
        const basketItem = goodsList.find(({ id_product: _id }) => _id === res.body.id);

        if (basketItem.count >= 2) {
            return {
                ...basketItem,
                count: basketItem.count - 1
            }
        } else if (basketItem.count = 1) {
            basketItem.remove
        }

        return writeFile(BASKET, JSON.stringify(goodsList)).then(() => {
            return getReformBasket()
        }).then((result) => {
            req.send(result)
        })
    })
})*/





app.get('/basket', (req, res) => {
    getReformBasket().then((result) => {
        res.send(JSON.stringify(result))
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
});
