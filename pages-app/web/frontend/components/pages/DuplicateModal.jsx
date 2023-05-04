import { Modal, TextContainer, TextField } from "@shopify/polaris";

const DuplicateModal = ({
  active,
  setActive,
  primaryAction,
  title,
  setTitle,
}) => {
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      title={`Duplicate this page`}
      primaryAction={{
        content: "Duplicate",
        onAction: primaryAction,
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
          <TextField
            label="Provide a name for your new page"
            value={title}
            onChange={(e) => setTitle(e)}
          />
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default DuplicateModal;
