<div align="center">
    <h1>🧣re-promise</h1>
    Retry failed api calls with an exponential back off time
</div>

<hr />

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.com/vivek12345/re-promise.svg)](https://travis-ci.com/vivek12345/re-promise)

### 🛠 Installation

```
yarn add @viveknayyar/re-promise
```

or

```
npm i @viveknayyar/re-promise --save
```

### 🧠 Usage

```javascript

// some js function in your code which fetches users data

const fetchUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 'vivek', name: 'vivek' });
    }, 10);
  });
};

```

```javascript
// with es6 await
import { retryPromise } from 're-promise';

async function retryAndFetchUser(id) {
  try {
    // await on this promise to resolve if you are using es6 await
    const resp = await retryPromise({
      fn: () => fetchUser(id),
      retries: 3,
      retryDelay: 2000,
      retryOn: function(e) {
        return [500, 502].includes(e.response.status);
      }
    });
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

```

```javascript
// with traditional promises
import { retryPromise } from 're-promise';

function retryAndFetchUsers(id) {
  return retryPromise({
    fn: () => fetchUser(id),
    retries: 3,
    retryDelay: 2000,
    retryOn: function(e) {
      return [500, 502].includes(e.response.status);
    }
  }).then(resp => {
    return resp;
  }).catch(e => {
    console.log(e);
    return Promise.reject(e);
  });
}

```

## 🧩 Api


| Props                   | Type                   | Default   | Description                                                                                         |
|-------------------------|------------------------|-----------|-----------------------------------------------------------------------------------------------------|
| fn                     | function                 | null      | function to call which should return a promise                                                                                      |
| retries              | number                 | 3         | The maximum amount of times to retry the operation.                                              |
| retryDelay               | number               | 3000         | The number of milliseconds before starting the retry.                |
| retryOn               | function               | null  | function to specify a custom logic to decide if retry should be done or not                                                  |
| backOffFactor               | function               | 1  | The exponential factor to use. Default is 1                                                  |
| debug               | boolean               | false  | print information around retry attempts                                                  |

#### fn (required)

This function will be called every time we want to retry a promise or an api call. Make sure you return a promise from this function.
It has the following signature:

```javascript
function fn() {
  return axios.get('some url');
}
```

#### retryOn (not compulsory)

This function will be called every time we have to decide if the promise should be retried or not. This function will be called with the error object so you can put in logic inside this function to return true or false based on which we will decide if the api call should be retried or not.

```javascript
function retryOn(error) {
  // logic to retry on certain status codes
  return [502,500].includes(error.response.status);
}
```

#### backOffFactor (not compulsory)

This param will decide the exponential delay between retry attempts.
For example: 

```javascript
// with es6 await and backOffFactor
import { retryPromise } from 're-promise';

async function retryAndFetchUser(id) {
  try {
    // await on this promise to resolve if you are using es6 await
    const resp = await retryPromise({
      fn: () => fetchUser(id),
      retries: 3,
      retryDelay: 2000,
      backOffFactor: 3,
      retryOn: function(e) {
        return [500, 502].includes(e.response.status);
      }
    });
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

```

In the above case, our first retry call will happen after the `retryDelay` of 2000ms.
The next retry call will now happen after `retryDelay*backOffFactor` which is 6000ms and similarly we will continue for the next call.


## 🧳 Size

<img src='./size.png' />

## 🎈 Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions and pull request are welcome !

### 📝 License

MIT © [viveknayyar](https://github.com/vivek12345)

## 👷 TODO

- [x] Complete README
- [ ] Add Examples and Demo
- [x] Test Suite

## 🎊 Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.viveknayyar.in/"><img src="https://avatars3.githubusercontent.com/u/4931048?v=4" width="100px;" alt=""/><br /><sub><b>Vivek Nayyar</b></sub></a><br /><a href="#question-vivek12345" title="Answering Questions">💬</a> <a href="https://github.com/Vivek Nayyar/re-promise/issues?q=author%3Avivek12345" title="Bug reports">🐛</a> <a href="https://github.com/Vivek Nayyar/re-promise/commits?author=vivek12345" title="Code">💻</a> <a href="#design-vivek12345" title="Design">🎨</a> <a href="https://github.com/Vivek Nayyar/re-promise/commits?author=vivek12345" title="Documentation">📖</a> <a href="#ideas-vivek12345" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-vivek12345" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-vivek12345" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!