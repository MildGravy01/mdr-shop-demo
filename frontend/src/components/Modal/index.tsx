import {motion, AnimatePresence} from 'framer-motion';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { IModalProps } from './types';

const modalVariant = {
  initial: {backgroundColor: 'rgba(0,0,0,0)'},
  isOpen: {backgroundColor: 'rgba(0,0,0,0.6)'},
  exit: {backgroundColor: 'rgba(0,0,0,0)'},
};
const containerVariant = {
  initial: {transform: 'translate(-50%,-70%)', opacity: 0},
  isOpen: {transform: 'translate(-50%,-50%)', opacity: 1},
  exit: {transform: 'translate(-50%,-70%)', opacity: 0},
};


const Modal = ({isOpen, closeHandler, children, onClose}: IModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      onClose?.();
    }
  }, [isOpen, onClose]);
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
   if(isOpen){
    document.body.style.overflow = 'hidden';
   } else {
    document.body.style.overflow = 'unset';
   }
}, [isOpen]);

  const ModalBody = (
    <AnimatePresence>
      {isOpen&&
        <Overlay
          initial={'initial'}
          animate={'isOpen'}
          exit={'exit'}
          variants={modalVariant}
          onClick={() => closeHandler?.(false)}>
          <div className="modal-content" >
            <ModalContent
              initial={'initial'}
              animate={'isOpen'}
              exit={'exit'}
              transition={{ease: 'easeOut', duration: 0.25}}
              variants={containerVariant}
            >
              {children}
            </ModalContent>
          </div>
        </Overlay>}
    </AnimatePresence>);
    const root = document.querySelector('#root');
    if(root){
      return ReactDOM.createPortal(ModalBody,root);
    }
};
export {Modal};


const Overlay = styled(motion.div)`
position: fixed;
display: flex;
justify-content: center;
height: 100%;
width: 100%;
background-color: rgb(0,0,0);
z-index: 100;
top: 0;
left: 0;
overflow-y: auto;
.modal-content{
position: relative;
width: 100%;
}
`;

const ModalContent = styled(motion.div)`
position: absolute;
justify-content: center;
top:30%;
left:50%;
height: 50%;
padding-bottom: 50px;
z-index: 101;
`;
