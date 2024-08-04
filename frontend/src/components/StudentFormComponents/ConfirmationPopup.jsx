// ConfirmationPopup component
export const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
      <p>Are you sure all the details are correct?</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  </div>
);
