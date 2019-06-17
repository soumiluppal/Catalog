import { serverURL } from '../constants/config';

const users = {
    "testuser": {
        username: "testuser",
        password: "testpassword",
        name: "Test Name",
        email: "testemail@email.com"
    }
}

const categories = {
    "total_categories": 3,
    "categories": [
        {
            "id": 1,
            "name": "Test category 1",
            "description": "category description",
            "created": "2015-08-05T08:40:51.620Z",
            "updated": "2018-04-03T08:40:51.620Z"
        },
        {
            "id": 2,
            "name": "Test category 2",
            "description": "category description",
            "created": "2015-08-05T08:40:51.620Z",
            "updated": "2018-04-03T08:40:51.620Z"
        },
        {
            "id": 3,
            "name": "Test category 3",
            "description": "category description",
            "created": "2015-08-05T08:40:51.620Z",
            "updated": "2018-04-03T08:40:51.620Z"
        }
    ]
}

const items = {
    "total_items": 2,
    "items": [
        {
            "id": 1,
            "name": "item name 1",
            "description": "item description 1",
            "price": 30.5,
            "user_id": 4,
            "category_id": 2,
            "created": "2015-08-05T08:40:51.620Z",
            "updated": "2018-04-03T08:40:51.620Z"
        },
        {
            "id": 2,
            "name": "item name 2",
            "description": "item description 2",
            "price": 32.7,
            "user_id": 18,
            "category_id": 2,
            "created": "2015-08-05T08:40:51.620Z",
            "updated": "2018-04-03T08:40:51.620Z"
        }
    ]
}

const get = jest.fn((url) => {
    if (url.includes(`${serverURL}/categories?offset=0&limit=`)) {
        return Promise.resolve({ data: categories });
    }
    else if (url.includes(`${serverURL}/categories/2/items?offset=0&limit=`)) {
        return Promise.resolve({ data: items });
    }
});

const post = jest.fn((url, data) => {
    //return Promise.reject("ERROR");
    if (url === `${serverURL}/auth`) {
        if (users.hasOwnProperty(data.username) && users[data.username].password === data.password)
            return Promise.resolve({ data: { "access_token": "test_token", "user_id": 1 } });
        else
            return Promise.reject("ERROR");
    }
    else if (url === `${serverURL}/users`) {
        if (users.hasOwnProperty(data.username))
            return Promise.reject("ERROR");
        else
            return Promise.resolve({ data: { "access_token": "test_token" } });
    }
});

const put = jest.fn((url, data) => {
    if (url === `${serverURL}/categories/2/items/1`) {
        if (data.auth_token  === 123)
            return Promise.resolve({ data: {} });
        else
            return Promise.reject("ERROR");
    }
});

export default { get, post, put };