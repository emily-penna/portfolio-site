/**
 * Define shared elements and object classes 
 */

// --- Top Navigation Bar ---
export function NavigationBar(num){
    
    const nav = document.getElementById("nav");

    const body = document.createElement('ul');

    body.appendChild(makeNavLink('index.html', 'Me', num == 0));
    body.appendChild(makeNavLink('work.html', 'Work Experience', num == 1));
    body.appendChild(makeNavLink('projects.html', 'Projects', num == 2));

    nav.appendChild(body);
    
}

function makeNavLink(href, text, isActive){

    const link = document.createElement('li');
    
    const content = document.createElement('a');
    content.setAttribute('href', href);
    content.appendChild(document.createTextNode(text));

    if (isActive){
        content.setAttribute('class', 'active')
    }
    
    link.appendChild(content)

    return link;

}

// Element Icons

export function createProjectInfo(){

}