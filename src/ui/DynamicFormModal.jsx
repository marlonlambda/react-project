import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { DynamicForm } from "./DynamicForm";

export const DynamicFormModal = ({ isOpen, onClose, title, fields, onSubmit, children, size }) => {
    return (
        <Modal size={size} isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <>
                                <DynamicForm fields={fields} onSubmit={onSubmit} />
                                {children}
                            </>
                        </ModalBody>
                        <ModalFooter>
                            <Button size="sm" color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button size="sm" color="primary" type="submit" form="dynamic-form">
                                Guardar
                            </Button>
                        </ModalFooter>

                    </>
                )}
            </ModalContent>
        </Modal>
    );
}