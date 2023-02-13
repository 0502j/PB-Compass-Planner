import Modal from './Modal';

const ConfirmModal = (props) => {
    return(
        <Modal className={props.className}>
            {props.children}
        </Modal>
    );
}

export default ConfirmModal;