
import ServiceView from "../View/ServiceView";

const ServicePreview = ({
  formData,
  loading,
  isPreviewVisible,
  setIsPreviewVisible,
  handleFinalSubmitting,
  masjidId,
}: any) => {
  return (
    <div>
      <ServiceView
        loadingRequest={loading}
        formData={formData}
        isPreviewMode={isPreviewVisible}
        setIsPreviewVisible={setIsPreviewVisible}
        handleDisclaimerStatus={handleFinalSubmitting}
        masjidId={masjidId}
      ></ServiceView>
    </div>
  );
};

export default ServicePreview;
