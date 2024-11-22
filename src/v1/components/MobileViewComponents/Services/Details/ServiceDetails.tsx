import React, { useEffect, useState } from "react";
import ServiceView from "../View/ServiceView";
import { useCustomParams } from "../../../../helpers/HelperFunction";
import ServiceForm from "../ServiceForm";
import RegistrationsTable from "../Table/RegistrationsTable";
import ShareButtons from "../Helpers/ShareButtons/ShareButtons";
import ShareModal from "../Helpers/ShareButtons/ShareButtons";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SERVICE } from "../../../../graphql-api-calls/mutation";
import {
  GET_SERVICE_BY_ID,
  GET_USERS_FOR_SERVICE,
} from "../../../../graphql-api-calls/query";
import { adminFromLocalStg } from "../../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { useAppSelector } from "../../../../redux/hooks";


const ServiceDetails = () => {
  const [formData, setFormData] = useState<any>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isRegistrationsVisible, setIsRegistrationsVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const masjidIdQuery = queryParams.get("masjidId");
  // console.log("masjidIdQuery", masjidIdQuery);

  let admin = useAppSelector((state) => state.admin);
  const consumerMasjidId = masjidIdQuery
    ? masjidIdQuery
    : adminFromLocalStg()?.masjids[0];

  const id = useCustomParams();

  // Execute the query with the serviceId variable
  const { loading, error, data } = useQuery(GET_SERVICE_BY_ID, {
    variables: { id: id },
  });
  const {
    loading: serviceLoading,
    error: serviceError,
    data: ServiceData,
  } = useQuery(GET_USERS_FOR_SERVICE, {
    variables: { serviceId: id },
  });
  // console.log("dServiceDataata => ", ServiceData?.getUsersForService);

  useEffect(() => {
    if (data && data?.getServiceById) {
      const service = data.getServiceById;

      // formData.registrationOption
      // Map the data from the query response to the formData state
      setFormData({
        id: service.id,
        active: service.active,
        serviceName: service.serviceName || "",
        description: service.description || "",
        email: service.emailAddress || "",
        contactNumber: service.contactNumber || "",
        registrationRequired: service.registrationRequired || false,
        cost: service?.details?.cost || 0,
        responseResponse: service,
        image: service.image,
        timing: {
          startTime: service.details?.startTime || "",
          endTime: service.details?.endTime || "",
          time:
            service.attributes?.find(
              (attr: any) => attr.attributeName === "time"
            )?.attributeValues || [],
          customStartEndTime:
            service.attributes?.find(
              (attr: any) => attr.attributeName === "customStartEndTime"
            )?.attributeValues || [],
        },
        metaData: {
          type: service.details?.availabilityTiming || "",
          days:
            service.attributes?.find(
              (attr: any) => attr.attributeName === "days"
            )?.attributeValues || [],
        },
        consultationType: service.details?.consultationAvailability || "",
        sessionTime: service.details?.timePerSession || "",
        healthServices:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "healthServices"
          )?.attributeValues || [],
        visitingPhysicians:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "visitingPhysicians"
          )?.attributeValues || [],
        residentPhysicians:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "residentPhysicians"
          )?.attributeValues || [],
        consultants:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "availableConsultants"
          )?.attributeValues || [],
        assistanceTypes:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "assistanceTypes"
          )?.attributeValues || [],
        questions: JSON.parse(
          service.attributes?.find(
            (attr: any) => attr.attributeName === "questions"
          )?.attributeValues[0] || "[]"
        ),

        consultationQuestions: JSON.parse(
          service.attributes?.find(
            (attr: any) => attr.attributeName === "questions"
          )?.attributeValues[0] || "[]"
        ),
        registrationOption:
          service.attributes?.find(
            (attr: any) => attr.attributeName === "registrationOption"
          )?.attributeValues[0] || "",
      });
    }
    // registrationOption: service?.registrationOption || "",
  }, [data]);

  const handleToggleEditForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleToggleRegistrationTable = () => {
    setIsRegistrationsVisible(!isRegistrationsVisible);
  };

  const handleFinalSubmitting = () => {};
  if (isRegistrationsVisible)
    return (
      <RegistrationsTable
        handleToggleRegistrationTable={handleToggleRegistrationTable}
        id={id}
        formData={formData}
      ></RegistrationsTable>
    );
  if (isFormVisible)
    return (
      <ServiceForm
        setIsFormVisible={setIsFormVisible}
        serviceData={formData}
        isEditing={true}
        handleToggleEditForm={handleToggleEditForm}
        id={id}
        masjidId={consumerMasjidId}
      />
    );

  return (
    <div data-testid="service-details">
      <ServiceView
        loadingRequest={false}
        formData={formData}
        isPreviewMode={false}
        handleEditButton={handleToggleEditForm}
        setIsRegistrationsVisible={setIsRegistrationsVisible}
        handleDisclaimerStatus={handleFinalSubmitting}
        setIsShareVisible={setIsShareVisible}
        masjidId={consumerMasjidId}
      ></ServiceView>
      <ShareModal
        isOpen={isShareVisible}
        onClose={() => {
          setIsShareVisible(false);
        }}
        assetType="service"
        id={id}
        consumerMasjidId={consumerMasjidId}
      />
    </div>
  );
};

export default ServiceDetails;
