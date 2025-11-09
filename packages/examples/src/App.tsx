import { useState } from "react";
import { Modal, useModal, modal } from "@ui-patterns/react";
import "./App.css";

function App() {
  // 1. Declarative API
  const [isDeclarativeOpen, setIsDeclarativeOpen] = useState(false);

  // 2. Hook API
  const hookModal = useModal();

  // 3. Promise API handlers
  const handleConfirm = async () => {
    const result = await modal.confirm({
      title: "Delete Item",
      message:
        "Are you sure you want to delete this item? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (result.confirmed) {
      await modal.alert("Item deleted successfully!");
    }
  };

  return (
    <div className="app">
      <h1>UI Patterns - Modal Examples</h1>

      <div className="examples">
        <section>
          <h2>1. Declarative API</h2>
          <button onClick={() => setIsDeclarativeOpen(true)}>
            Open Declarative Modal
          </button>

          <Modal
            isOpen={isDeclarativeOpen}
            onClose={() => setIsDeclarativeOpen(false)}
            ariaLabel="Declarative Modal Example">
            <div className="modal-content">
              <h2>Declarative Modal</h2>
              <p>This modal uses the declarative API with isOpen prop.</p>
              <button onClick={() => setIsDeclarativeOpen(false)}>Close</button>
            </div>
          </Modal>
        </section>

        <section>
          <h2>2. Hook-based API</h2>
          <button onClick={hookModal.open}>Open Hook Modal</button>

          <Modal
            isOpen={hookModal.isOpen}
            onClose={hookModal.close}
            ariaLabel="Hook Modal Example">
            <div className="modal-content">
              <h2>Hook Modal</h2>
              <p>This modal uses the useModal hook.</p>
              <div className="modal-actions">
                <button onClick={hookModal.close}>Close</button>
                <button onClick={hookModal.toggle}>Toggle</button>
              </div>
            </div>
          </Modal>
        </section>

        <section>
          <h2>3. Promise-based API</h2>
          <button onClick={handleConfirm}>Open Confirm Dialog</button>
        </section>

        <section>
          <h2>4. Custom Styled Modal</h2>
          <button onClick={() => setIsDeclarativeOpen(true)}>
            Open Styled Modal
          </button>

          <Modal
            isOpen={isDeclarativeOpen}
            onClose={() => setIsDeclarativeOpen(false)}
            backdropClassName="custom-backdrop"
            containerClassName="custom-container"
            contentClassName="custom-content"
            closeOnBackdropClick={true}
            closeOnEscape={true}>
            <div className="modal-content custom">
              <h2>Custom Styled Modal</h2>
              <p>This modal has custom CSS classes applied.</p>
              <ul>
                <li>Click backdrop to close</li>
                <li>Press ESC to close</li>
                <li>Tab navigation is trapped inside</li>
                <li>Body scroll is locked</li>
              </ul>
              <div className="modal-actions">
                <button onClick={() => setIsDeclarativeOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </section>
      </div>
    </div>
  );
}

export default App;
