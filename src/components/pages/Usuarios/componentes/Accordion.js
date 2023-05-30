import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { syntaxHighlight } from "./utils/syntaxHighlighting";
import './Accordion.css';

function Accordion({ items }) {
   const [activeIndex, setActiveIndex] = useState(-1);
   const handleClick = (index) => {
      setActiveIndex(index === activeIndex ? -1 : index);
   };

   // let content = null;
   // if(activeIndex !== -1){
   //    const data = items[activeIndex].data.split('"');
   //    content = data.map((d, index) => {
   //       return ()
   //    });
   // }

   return (
      <div>
         {items.map((item, index) => (
            <div key={item.title} className='accordion'>
               <div className='title-accordion'>
                  <p>{item.nombre}</p>
                  <button className='btn-accordion' onClick={() =>handleClick(index)}><AiOutlinePlus /></button>
               </div>
               <div className='body-accordion'>
                  {/*index === activeIndex && <div className='p-accordion'><pre
                     dangerouslySetInnerHTML={{
                        __html: syntaxHighlight(JSON.stringify(JSON.parse(item.data), undefined, 4))
                     }}
                  /></div>*/}
                  {index === activeIndex && <div className='p-accordion'>{item.data}</div>}
               </div>
            </div>
         ))}
      </div>
   );
}
export default Accordion;