[Demo Here](https://benjvmin.github.io/NewsGrid/prod/index.html)

A mock News Application demonstrating how CSS Grid & CSS Custom Properties can change the look and feel of an application with minimal javascript. 

Change the color theme under the menu options, as well as a dark mode toggle.

# What I learned While Combining CSS Grid & CSS Custom Properties (CSS Variables)

Presently, I embrace the notion that we are still experiencing the beginning stages in CSS Grid's widespread adoption, which is poised to completely change the way we reason with layout in CSS. This shift towards a multifaceted layout solution is signigicant on it's own for a number of reasons, but alongside CSS Custom Properties spec, it downright a gamechanger in how we rationalize responsive stylesheets. Together [CSS Grid](https://caniuse.com/#feat=css-grid) & [CSS Variables](https://caniuse.com/#search=css%20variables) operate on nearly the same amount of browsers together, with each spec providing a new foundation for how we work with CSS, both now & in the future. I'd hope to bring forward my experiences embracing both of these abundant specifications together, with an expectation that I can further help facilitate discussion around correctly utiliziling CSS Grid & CSS Custom Properties in tandem to reach their maximum potential, and at the small expense of browser support. 

For the uninitiated here are some fantastic resouces on CSS Grid & Custom Properties

CSS Grid
* [Grid By Example](https://gridbyexample.com/examples/)
* [CSS Grid MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

Custom Properties 
* [MDN Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
* [It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)
* [CSS Custom Properties and Theming](https://css-tricks.com/css-custom-properties-theming/)


Here are the biggest things I've learned from putting these specs into practice with my Demo.

# 1. Variable Scope & Cascade
Most CSS Variable tutorials will introduce a ```:root``` selector, which [per MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) mentions that it's essentially an ```html``` selector with an even higher specificity in the document. Aligning our custom properties under this selector provides us with control over application wide declarations, and the ability for each component to inherit and redefine these variables, giving us the power to "theme" our website, and redefine each declaration as we (or the user) would please. What about components though? Can we declare compenent level properties and reuse them, just as we can with ```:root```? Why, yes we can, and when combined with CSS Grid, our CSS starts to look a little different from here. Lets take the outer ```.news``` component for instance.

```CSS
.news {
  /* news Custom Properties */
  --news-columns: 1fr;
  --news-rows: repeat(6, 220px);

  /* .news Component Properties */
  display: grid;
  grid-template-columns: var(--columns);
  grid-template-rows: var(--rows);
```
As you can see, we have our rows and columns defined as named properties ```--news-columns```, & ```--news-rows```, and then we assign them under ```grid-template-columns``` & ```grid-template-rows```, using the ```var()``` function. Besides the idea that these properties are only available to the ```.news``` component, what benefits do we get from this? Well these variables are now scoped to the individual ```.news``` component, and are available to each child element of the ```.news``` component as well, thanks to the cascading nature of CSS. Not every custom property needs to be defined globally, we can set and reuse declarations on a component level basis. This gives us some granular control over our declarations, and how we can redefine them. Imagine having a component with a subgrid, that has it's own scoped row and column declarations that can be redefined as needed when the screen is resized. I'd say take some time to think about if your declaration needs to be defined globally however, you don't want to run into a scenario where your delcaration needs to be available to other components. If a property you are defining needs to be referenced in multiple components, stick in in the root selector. 


# 2. Media Queries 
Once we throw media queries in the mix, having component level grid declaration unlocks a profound way of handling responsive design. Lets take our above code, and throw in a nested ```min-width``` media query. 
```CSS
.news {
  /* news Custom Properties */
  --news-columns: 1fr;
  --news-rows: repeat(6, 220px);

  /* .news Component Properties */
  display: grid;
  grid-template-columns: var(--columns);
  grid-template-rows: var(--rows);

  /* .news Responsive Properties */
  @media screen and (min-width: 768px) { 
    --news-columns: repeat(3, 1fr);
    --news-rows: repeat(3, 1fr);
  }
```
In the code above, we can now redefine our custom properties inside the media query, because unlike variables inside a preprocessor such as SASS, Custom Properties are living, breathing values inside the browser, and can be redefined as our design grows bigger. This makes our lives easier as developers because we are now just assigning our layout value once, and then adjusting the custom properties as necessary, instead of having to redeclare and redefine layout properties on our component every time the screen size changes. We can also see how the organization of our CSS changes now, having both custom property & responsive declarations both as properties of the ```.news``` component. Now all of a sudden we have the obligation to organize our code in such a way that our Custom Property declarations, component styles,and media queries need to co-exist peacefully. Much more work can be done on this front- maybe a methodology can help us keep all of these things consistent under the hood, but for now it's important to keep them clean and organized so that we can visually seperate them, because with a lot of CSS, it can get messy quick. 


# 3. Theming & Javascript
I believe that component level Custom Properties excel the most when used in tandem with layout, but there are many other areas where you would want to have globally defined custom properties under the ```:root``` selector, and available for every component to hook into and change. A simple example would be defining a font & size, such as 

```CSS
:root {
  --font-size: 16px;
  --font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

but the possibilities are endess. For this demo application I leveraged the defining custom colors under the ```:root``` selector, and then defined a linear gradient to use the custom colors for a background. Lets look under the hood here:

```CSS
:root {
  --color-one: rgba(230, 218, 218, 0.7);

  --red: rgba(255, 0 ,0, 0.7);
  --indigo: rgba(102, 51, 153, 0.7);
  --orange: rgba(255, 165, 0, 0.7);
  --orangered: rgba(255, 69 ,0, 0.7);
  --green: rgba(46, 139 ,87, 0.7);
  --blue: rgba(30, 144 ,255, 0.7);
   --slateblue: rgba(72, 61 ,139, 0.7);
  --violet: rgba(238, 130 ,238, 0.7);
  --gray: rgba(37, 41, 46, 0.7);

  --linear-gradient: linear-gradient(to bottom, var(--color-one), var(--indigo));
}
```

excuse my poor naming aside- we can see that we have one color declared as a constant color at the top of our root selector, and then a rainbow of colors that we have the potential to use inside of our linear gradient. By default the linear gradient's second color is using the indigo custom property, currently leaving the other colors dormant as of now. The linear gradient is assigned to each card component with an nth-child psuedo selector, perfect for keeping our components free of extra class names as hooks. 

```CSS

.news-card {
  /* I use the nth-child() selector for all 6 news card components, one is just shown here for brevity*/
  &:nth-child(1) {
      background-image: var(--linear-gradient), url(assets/mountains.jpg);
  }
}
```

Javascript immediately makes this interesting now, giving us the potential to change that global ```--linear-gradient``` custom property to quickly unlock those other colors I defined in the root component. Lets hook into the linear gradient with javascript. 

```javascript

const root = document.documentElement;
const color = "green"; // Could be red, gray, violet, etc.

root.style.setProperty("--linear-gradient", `linear-gradient(to bottom, var(--color-one), var(--${color}))`);
```

This is a simplified version no doubt, but we can see how we can leverage this with an event to swiftly change colors of every element with a the custom ```--linear-gradient``` property applied. Note that we are just passing the color name in of a custom variable we have already defined, but instantly we can see the benefits of using javascript to hook in an change every instance of the custom property. 

# 4. Fallback Values
One quick note here about the Custom Properties specification, is the ability to provide fallback values inline with your ```var()``` function.
```CSS

nav {
  /* Nav color is not defined */ 
  background-color: var(--nav-color, purple);
}
```
If there is no --nav-color variable defined (whether globally or on a component level) then the fallback to purple is used. Do note that per [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), overusing this can provide heavy performance issues, due to calculation from the browser, so be careful when you do use them. 


# Conclusion
My hope is that this can be a living document, where I continually add what I'm learning about these specifications and their continued use in my applications. Gone are the days where I am using intense float or inline-block hacks to elevate my layout, those days were in the rearview when flexbox was introduced, but now more than ever are they disappearing. We haven't reached widespread adoption of Custom Properties and CSS Grid quite yet because of browser support- at my old internship I wouldn't even be able to sniff at these specifications. Now that I've used them freely however, it quickly becomes empowering to create anything you can possibly imagine. Maybe not today, or tomorrow, or even a year from now we will be seeing more of this in the wild, but slowly and surely as father time erases the existence of Internet Explorer, we can see these specifications blossom into frution. 


