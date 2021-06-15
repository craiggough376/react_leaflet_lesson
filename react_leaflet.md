## Learning Objectives
 - Know the benefits of React Router
 - Be able to use React Router in a simple application

## Introduction
Traditional server rendered applications work by entering the URL into the browser address bar, making a new request for each page. Traditionally, each page  was normally actually a file or folder that's hosted on the web-server. So if we went to `mysite.com/about` on a site running an older server, it would actualy look in the `./about` directory for an `index.html` page, and return that to the browser. This means that the information being displayed and the URL are kept in sync.

 Single-Page Applications are only actually loaded from one single html file. This makes navigation difficult. Browser navigation buttons don't work, and we can't direct users directly to specific pages of the app. React has a router module which will help us out with this. It allows us to create a Single-Page application where the UI and URL will be kept in sync so we can use the Browser Navigation features.


### Setup

Let's set up an application.

 > Instructor note: Hand out the router start point

This is a simple application that does nothing rendering a title. Looking around, there are more components in the `components` directory.


# Why Router
We have About, Home and Pricing components. We would like each of them to appear to be accessible through browser based routing. This means we would like to go to `localhost:3000/about` and see the About component; go to `localhost:3000/home` to see Home and `localhost:3000/pricing` to show Pricing.

**How can we do this, if react is desgiend to offer graphical interfaces as a "single page"?**  
  
Enter the need for a router. React router is a library for allowing us to create fake routes or pages on our application, and assign a component to them.

> Does that mean that we want all of our components to be attached to one of these components?

**No. In a typical react app there might be tens or even hundreds of components, but we only want to attach routes to the ones that we want to use as our main "pages" or "views" of the application**

# Adding Router

It's a library that's not built into the react library, so we need to install it through NPM.

```
  npm install react-router-dom
```

Let's set up the `App` component to work as router. We will import our other components so we can later pass them in our routes. We will also import `BrowserRouter` (which we rename `Router` for convenience) from the `react-router-dom` library.

```js
// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //NEW
import About from "./components/About"; //NEW
import Home from "./components/Home";  //NEW
import Pricing from "./components/Pricing";   //NEW

```

And we use this `Router` component in our `render` method:

```js
// /src/App.js
return (
	<Router>
	
	</Router>
);

```

`Router` will keep track of our navigation through our entire React application. This means now when we refresh it will remember where we were and we can use our browser navigation buttons to go back and forth through our browsing history. We want to bring in the `<Router>` component pretty high up in the tree.

Now we are going to define our routes inside our `Router`. We have to wrap them in a fragment (`<>` / `</>`) because `BrowserRouter` only expects one element. Each `Route` takes two attributes, a path and a component to render on that path.

```js
// /src/App.js
import { BrowserRouter as Router, Route } from "react-router-dom"; // UPDATED

const App = () => {


  // AS BEFORE

return (
  <Router>
    <>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
    </>
  </Router>
);
}

```

Think of using the `<Router>` and `<Route>` components like creating an index for a book. The `<Router>` says we're going to create an index page, and a `<Route>` specifies an individual entry into the index.

**Neither <Router> or <Route> are components which we will be able to *see* rendered in our application - as they are acting as placeholders**. These placeholders tap into the the page that we ask our browser to navigate to, and only when we navigate to a page which has a `<Route>` registered for it, it will render that component.

We set up an an ***exact*** path to render the Home component. This will render the Home component on http://localhost:3000/ only. The other paths will load their relevant components.


## Navigation

We can now check the routes we created by visiting them in our browser:

* http://localhost:3000/
* http://localhost:3000/about
* http://localhost:3000/pricing

But typing addresses into the browser is no good. Our app needs a navbar!

```bash
touch src/components/NavBar.js
```

```js
// /src/App.js
import NavBar from "./NavBar";

<Router>
  <>
    // NEW
    <NavBar />
    {/* Routes as before */}
  </>
</Router>
```

Our `NavBar` is going to be a stateless functional component, and we're going to make an unordered list of links. In HTML, we would use `a` tags for links, with `href` attributes that point to a URL. React Router has a built-in `Link` component, which has a `to` attribute to point to its routes. This makes for some really cute code:

```js
// /src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/pricing">Pricing</Link>
      </li>
    </ul>
  );
}

export default NavBar;
```

We can see as we navigate through the site, and the URL changes. So our browser's back button works as we'd expect, and we can bookmark pages in our app.

### Task: (5 minutes)

Create a new component and add it to the list of links in the Main component.

## Passing down props

Loading our components in this way is ideal, we just pass the component to a `Route` and React Router knows what to do. It knows how to render it, and when. This is without a doubt React Router's preferred way of linking URL paths with components.

But there is a problem. With this syntax, there is no way of passing props to a component that we have set up a route for. Most of the time, this is fine; our routes point to top-level components, which act like separate pages and don't need to take in props. But sometimes we _do_ need to pass props down, and luckily React Router has a very nice syntax for this.

Let's say we wanted to pass some actual pricing data to our `Pricing` page component. Maybe in the real world this data might come from our server, but for now we'll just hard-code it in our `Main` component's state:

```js
// /src/App.js
import React, { useState } from 'react';  // MODIFIED

//as before

const App = () =>{
let initialPricing = [
    { level: "Hobby", cost: 0 },
    { level: "Startup", cost: 10 },
    { level: "Enterprise", cost: 100 }
  ];
  
  const [pricing, setPricing] = useState(initialPricing);
  
  //as before
}
```

Right now we're passing our `Pricing` component into a `Route` through the `Route`'s `component` property. This is fine for most React Router routes, but there's no way to pass props into `Pricing` now. Instead, we have to tell the `Route` _exactly_ what to render here, through its `render` prop:

```js
// App.js

      <Route   // UPDATED HERE
        path="/pricing"
        render={() => <Pricing prices={pricing} />}
      />
   
```

We can check this out in React dev tools and see that when the `Pricing` component mounts at http://localhost:3000/pricing it gets passed an array of 3 prices as props.

We can make use of these props to render a price list:

```js
// /src/components/Pricing.js

const Pricing = ({prices}) => { // UPDATED

  const listItems = prices.map((price, index) => { // NEW
    return <li key={index}>{price.level}: £{price.cost} per month</li>
  })

  return (
    <div>
      <h4>Pricing</h4>
      <ul>
        { listItems } // UPDATED
      </ul>
    </div>
  )
};
```

## Switch

Lastly, let's look at what would happen if we wanted to add a default component that renders in the event of a user trying to hit a route that we haven't defined. Let's create an `ErrorPage` component.

```bash
touch src/components/ErrorPage.js
```

```js
// /src/components/ErrorPage.js
import React from 'react';

const ErrorPage = ()=> (
  <h1>404 - PAGE NOT FOUND</h1>
)

export default ErrorPage
```

And then let's implement it in our Router:

```js
// /src/App.js

import ErrorPage from './components/ErrorPage' //NEW

<Router>
  <>
    <NavBar />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route 
        path="/pricing"
        render={() => <Pricing prices={pricing} />}
      />
    <Route component={ErrorPage} /> //NEW
  </>
</Router>

```

If we look in the browser now, we can see an issue - our `ErrorPage` component is rendering on every page of our app. This isn't what we wanted to happen! The way we can solve this is by bringing in the `Switch` component that's also included with `react-router-dom`.

By implementing a switch component and wrapping our routes inside it, we can ensure that the only the component we want displayed is rendered when the browser hits our routes. Like so:

```js

// /src/App.js

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // UPDATED

<Router>
  <>
    <NavBar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/pricing" component={Pricing} />
    <Route component={ErrorPage} />
    </Switch>
  </>
</Router>

```

Now if we check back, everything should be working as expected. `"/"`, `"/about"`, `"/pricing"` all display their respective components, and any other path we type into our browser address bar will give us our `ErrorPage` component.

How is `switch` doing this? Before, we would see every Route that matched our path - `"/about"` would display our `About` component, our `ErrorPage` component, and say hypothetically if we had a Route rendering a component with a path that held a parameter variable, `"/:id"` for instance, that too would be rendered. Prior to our switch, router was rendering components _inclusively_ - anything that could feasibly match the same path was appearing. Now, we mitigate that with `switch`, which achieves this by rendering the first route that matches the path we're trying to reach in our browser _exclusively_.

There is a pitfall there however - if the default Route was the first one in our `Router`, that's the only one that will ever display, because the switch sees that it matches, renders it and stops. So just as we have in other programming languages, if we're implementing a `switch`, we need to be mindful of the ordering of our Routes.

## Summary

In this lesson we've seen how React Router enables our users to use standard browser features like a Back button and bookmarks, by matching our UI to appropriate URLs. We can set up `Routes` within a `Router` component, match them to specific URL paths, and load components when the browser requests those routes. We can also pass properties into the components that React Router loads. We have also seen how to use the `Link` component in place of `a` tags to take advantage of React Router's features, and how we can use `Switch` to ensure more control over what components are rendering dependent on the URL path.

### Useful resources

* [React Router Website - reactrouter.com](https://reactrouter.com)
* [React Router v5 docs](https://reactrouter.com/web/api)