require('dotenv').config();

let Parser = require('rss-parser');

const express = require('express');
const cors = require('cors');
const { CronJob } = require('cron');
const db = require('quick.db');

const PORT = process.env.EXPRESS_PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

new CronJob(
    '0 */1 * * * *',
    async function () {
        const feed = await new Parser().parseURL('https://lifehacker.com/rss');

        db.set('title', feed.title);

        if (parseInt(feed.items[0].guid) !== parseInt(db.get('lastPostID'))) {
            db.push('posts', feed.items[0]);
            db.set('lastPostID', parseInt(feed.items[0].guid));
            console.log('[LOG] New post.');
        }
    },
    null,
    true,
    'Europe/Kiev'
);

app.get('/api/post/get', async (req, res) => {
    res.send(db.get('posts').reverse());
});

app.post('/api/post/edit', (req, res) => {
    if (!req.body.content && !req.body.guid) return res.sendStatus(400);

    const { content, guid } = req.body;
    let posts = db.get('posts');

    const postIndex = posts.findIndex((item) => item.guid === guid);
    posts[postIndex].content = content;

    db.delete('posts');
    posts.map((item) => {
        db.push('posts', item);
    });

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`API STARTED: ${PORT} P`));

// let feed = await parser.parseURL('https://lifehacker.com/rss');
