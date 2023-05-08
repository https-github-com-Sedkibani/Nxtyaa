import * as React from "react";
import Select from "react-select";

interface IGlaceSelector {
  setProduct: any;
}

const GlaceSelector: React.FunctionComponent<IGlaceSelector> = (
  props: IGlaceSelector
) => {
  const { setProduct } = props;
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "30rem",
      borderRadius: 60,
      background: "#d7ecff",
      fontWeight: "500",
      padding: "0 2rem",
      border: "3px solid #490093",
      height: "4rem",
      paddingBottom: "1rem",
      "@media (max-width:991px)": {
        marginBottom: "2rem",
      },
      "@media (min-width:992px)": {
        height: "6rem",
        border: "4px solid #490093",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "4rem",
      justifyContent: "center",
      fontWeight: "500",
      paddingBottom: "1rem",
      "@media (min-width:992px)": {
        height: "6rem",
        paddingBottom: "1rem",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#490093",
      fontSize: "1.2rem",
      textAlign: "center",
      paddingBottom: "1rem",
      fontWeight: "500",
      "@media (min-width:992px)": {
        fontSize: "1.4rem",
        paddingBottom: "1rem",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#490093",
      fontWeight: "500",
      fontSize: "1.2rem",
      textAlign: "center",
      paddingBottom: "1rem",
      "@media (min-width:992px)": {
        fontSize: "1.4rem",
      },
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
      placeholder="إختر نوع جيل آيس هنا "
      name="city"
      onChange={(_product: any) => setProduct(_product)}
      isSearchable={false}
      styles={customStyles}
      options={[
        {
          label: "أعواد شكلاطة",
          value: "X3D2",
        },
        {
          label: "أعواد فراولة",
          value: "X3D3",
        },
        {
          label: "أعواد فستق",
          value: "X3D1",
        },
        {
          label: "أعواد فانیلا",
          value: "X3D4",
        },

        {
          label: "طربوش شكلاطة",
          value: "X2D2",
        },
        {
          label: "طربوش فراولة",
          value: "X2D3",
        },
        {
          label: "طربوش فستق",
          value: "X2D1",
        },
        {
          label: "طربوش فانیلا",
          value: "X2D4",
        },

        {
          label: "كوب شكلاطة",
          value: "X1D2",
        },
        {
          label: "كوب فراولة",
          value: "X1D3",
        },
        {
          label: "كوب فستق",
          value: "X1D1",
        },
        {
          label: "كوب فانیلا",
          value: "X1D4",
        },

        {
          label: "سوربیت مانقو",
          value: "X4",
        },
      ]}
    />
  );
};

export default GlaceSelector;
