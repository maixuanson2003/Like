import React from 'react'

const Modal = ({show, title, handleClose, children, width = '50%', height = 'auto', modalClass}) => {
  if(show){
    return (
        <div id="myModal" class="modal">
          <div class={`modal-content ${modalClass ?? ''}`} style={{
            width,
            height
          }} >
            <div className="flex justify-between items-center border-b px-5 py-3">
              <div className='font-bold text-xl'>
                {title ?? ''}
              </div>
              <span class="close" onClick={()=>{
                handleClose();
              }}>&times;</span>
            </div>
            <div>
                {children}
            </div>
          </div>
        </div>
      );
  }
  return <></>
}

export default Modal