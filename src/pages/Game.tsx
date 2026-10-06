import { useEffect } from 'react'

export default function Game() {
   useEffect(() => {  
       const script = document.createElement("script");  
       script.type = "module";
       script.src = "./src/SlimeSpire/SlimeSpire.js";
       script.async = true;  
       document.body.appendChild(script);  
     }, []); 
   
     return (
       <div>
           <canvas id="gameWindow" width="300" height="300" />
       </div>
     );
}