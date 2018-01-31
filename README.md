# News Grid

[Demo Here](https://benjvmin.github.io/NewsGrid/prod/index.html)

A mock News Application demonstrating how CSS Grid & CSS Custom Properties can change the look and feel of an application with minimal javascript. 

Change the color theme under the menu options, as well as a dark mode toggle.

# What I learned While Embracing CSS Grid & CSS Custom Properties (CSS Variables)

If it hasn't been clear now how CSS Grid will forever change the way we reason with layout in CSS- let me help clarify a bit. This shift towards an all encompassing layout solution is signigicant on it's own for a number of reasons, but alongside CSS Custom Properties spec, it downright a gamechanger in how we reason about CSS from napkin mockup to shipped product. 

For the uninitiated here are some fantastic resouces on CSS Grid & Custom Properties

CSS Grid
[Grid By Example](https://gridbyexample.com/examples/)
[CSS Grid MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
[A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

Custom Properties 
[MDN Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
[It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)
[CSS Custom Properties and Theming](https://css-tricks.com/css-custom-properties-theming/)


Here are the biggest things I've learned from putting these specs into practice.

# 1. Variable Scope 
Have you been acclimated with ```:root``` element yet? This the recommended way to organize application wide variables, as it provides the highest specificity without inherinately declaring component level CSS, with all the benefits of the cascade. What about components though? Can we provide declare compenent level properties and reuse them? Yes we can, and when combined with CSS Grid, our CSS starts to look a little different. Lets take the outer .news component for instance.
```CSS

.news {
  //.news Custom Properties
  --columns: 1fr;
  --rows: repeat(6, 220px);

  //.news Component Properties
  display: grid;
  grid-template-columns: var(--columns);
  grid-template-rows: var(--rows);
  color: white;
  height: auto;
  transition: filter 0.3s ease-in-out;
  margin-top: 50px;
```
As you can see here we have our rows and columns defined as named properties ```--columns```, & ```--rows```, and then we assign them under ```grid-template-columns``` & ```grid-template-rows```. Besides the idea that these properties are only available to the ```.news``` component, what benefits do we get from this? Well these variables aren't available to other components outside of the the CSS declaration they are defined in, giving you explicit control over resusable parts of your component. Not only that, but now every child of the  ```.news``` component has access to the defined custom properties. This gives you the ability to reuse and redefine component level properties, without worrying about global properties if you are not using them. Don't go crazy though- there is a reason why the ```:root``` element is so important, because it gives you resuable CSS through the ENTIRE document. If a property you are defining needs to be referenced in multiple components, stick in in the root selector.


# 2. Media Queries 
Combining Media Queries with Variable scope gives unlocks a profound way of handling responsive design. 

(More to come soon)



When I was first acclimated with layout properties as a younger dev, it was an amalgamation of float & inline block hacks, augmented by UI frameworks to emulate an established grid system, still (in my opinion) falling short of such grid systems presented in print software, and with additional roadblocks presented thanks to the nature of responsive design. What about breakpoints? Responsive typography? Flexbox came along and finally presented a viable solution to such layout problems- and even enhanced them. Yet there was still a spot