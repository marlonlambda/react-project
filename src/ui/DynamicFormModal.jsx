import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { DynamicForm } from "./DynamicForm";

export const DynamicFormModal = ({ isOpen, onClose, title, fields, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <DynamicForm fields={fields} onSubmit={onSubmit} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit" form="dynamic-form">
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}