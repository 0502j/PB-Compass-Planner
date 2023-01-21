import Modal from './Modal';

const ConfirmDeletion = (props) => {
    return(
        <Modal className={props.className}>
            {props.children}
        </Modal>
    );
}

export default ConfirmDeletion;