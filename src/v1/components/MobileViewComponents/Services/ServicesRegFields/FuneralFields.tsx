import React from "react";

interface FuneralFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const FuneralFields: React.FC<FuneralFieldsProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="dateOfDeath">Date of Death</label>
        <input
          type="date"
          id="dateOfDeath"
          name="dateOfDeath"
          value={formData.dateOfDeath || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="funeralDate">Funeral Date</label>
        <input
          type="date"
          id="funeralDate"
          name="funeralDate"
          value={formData.funeralDate || ""}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FuneralFields;
