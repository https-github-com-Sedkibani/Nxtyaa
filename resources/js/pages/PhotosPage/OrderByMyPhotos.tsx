import * as React from "react";
import Select from "react-select";

interface IOrderByMyPhotos {
  setIsMyPhotos: any;
}

const OrderByMyPhotos: React.FunctionComponent<IOrderByMyPhotos> = (
  props: IOrderByMyPhotos
) => {
  const { setIsMyPhotos } = props;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "2rem",
      backgroundColor: "#490093",
      borderRadius: 60,
      fontWeight: "500",
      border: "0!important",
      minWidth: "20rem",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      justifyContent: "center",
      fontWeight: "500",
      paddingBottom: "1rem",
      "@media (min-width:992px)": {
        paddingBottom: "1rem",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
      textAlign: "center",
      fontWeight: "500",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
      fontWeight: "500",
      textAlign: "center",
    }),

    option: (provided: any) => ({
      ...provided,
      color: "#490093",
      fontWeight: "500",
      fontSize: "1.2rem",
      textAlign: "center",
      "@media (min-width:992px)": {
        fontSize: "1.4rem",
      },
    }),
  };

  return (
    <Select
      menuPortalTarget={document.body}
      placeholder="إظهار حسب المشاركات"
      name="z"
      onChange={(_filter: any) => {
        if (_filter.value === "mine") {
          setIsMyPhotos(true);
        } else {
          setIsMyPhotos(false);
        }
      }}
      isSearchable={false}
      styles={customStyles}
      options={[
        {
          label: "صوري",
          value: "mine",
        },
        {
          label: "صور المشاركين",
          value: "all",
        },
      ]}
    />
  );
};

export default OrderByMyPhotos;
