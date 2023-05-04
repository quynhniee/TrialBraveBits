import { Modal, TextContainer } from "@shopify/polaris";

const DiscardModal = ({ active, setActive, primaryAction }) => {
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      title={`Discard all unsaved changes`}
      primaryAction={{
        content: "Discard changes",
        onAction: primaryAction,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Continue editing",
          onAction: () => setActive(false),
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            If you discard changes, you'll delete any edits you made since you
            last saved.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default DiscardModal;
