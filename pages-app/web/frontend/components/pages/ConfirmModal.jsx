import { Modal, TextContainer } from "@shopify/polaris";

const ConfirmModal = ({ pagesNumber, active, setActive, primaryAction }) => {
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      title={`Delete ${pagesNumber} page?`}
      primaryAction={{
        content: "Delete",
        onAction: primaryAction,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => setActive(false),
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            Deleted pages cannot be recovered. Do you still want to continue?
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default ConfirmModal;
