[Demo Here](https://benjvmin.github.io/NewsGrid/prod/index.html)

A mock News Application demonstrating how CSS Grid & CSS Custom Properties can change the look and feel of an application with minimal javascript. 

Change the color theme under the menu options, as well as a dark mode toggle.

# What I learned While Combining CSS Grid & CSS Custom Properties (CSS Variables)

Presently, I embrace the notion that we are still experiencing the beginning stages in CSS Grid's widespread adoption, which is poised to completely change the way we reason with layout in CSS. This shift towards a multifaceted layout solution is signigicant on it's own for a number of reasons, but alongside CSS Custom Properties spec, it downright a gamechanger in how we rationalize responsive stylesheets. Together [CSS Grid](https://caniuse.com/#feat=css-grid) & [CSS Variables](https://caniuse.com/#search=css%20variables) operate on nearly the same amount of browsers together, with each spec providing a foundation for how we work with CSS, both presently & in the future. I'd hope to bring forward my experiences embracing both of these abundant specifications together, with an expectation that I can further help facilitate discussion around correctly utiliziling CSS Grid & CSS Custom Properties in tandem to reach their maximum potential, and at the small expense of browser support. 

For the uninitiated here are some fantastic resouces on CSS Grid & Custom Properties

CSS Grid
* [Grid By Example](https://gridbyexample.com/examples/)
* [CSS Grid MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

Custom Properties 
* [MDN Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
* [It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)
* [CSS Custom Properties and Theming](https://css-tricks.com/css-custom-properties-theming/)


Here are the biggest things I've learned from putting these specs into practice.

# 1. Variable Scope 
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
As you can see, we have our rows and columns defined as named properties ```--news-columns```, & ```--news-rows```, and then we assign them under ```grid-template-columns``` & ```grid-template-rows```. Besides the idea that these properties are only available to the ```.news``` component, what benefits do we get from this? Well these variables are now scoped to the individual ```.news``` component, and are available to each child element of the ```.news`` component as well. Not every custom property needs to be defined globally, we can set and reuse declarations on a component level basis. This gives us some granular control over our declarations, and how we can redefine them. Imagine having a component with a subgrid, that has it's own scoped row and column declarations that can be redefined as needed when the screen is resized. I'd say take some time to think about if your declaration needs to be defined globally however, you don't want to run into a scenario where your delcaration needs to be available to other components. If a property you are defining needs to be referenced in multiple components, stick in in the root selector. 


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
In the code above, we can now redefine our custom properties inside the media query, because unlike variables inside a preprocessor such as SASS, Custom Properties are living, breathing values inside the browser, and can be redefined as our design grows bigger. This makes our lives easier as developers because we are now just assigning our layout value once, and then adjusting the custom properties as necessary, instead of having to redeclare and redefine layout properties on our component every time the screen size changes.