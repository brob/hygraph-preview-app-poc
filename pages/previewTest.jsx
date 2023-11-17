import { useFieldExtension, Wrapper, useApp } from "@graphcms/app-sdk-react";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Page from "../components/Page";
import Test from "../components/Test";

function FieldElement() {
  const { form, extension } = useFieldExtension();
  const { fieldConfig } = extension;
  const { ID_FIELD, COMPONENT_NAME } = fieldConfig;
  const ids = ID_FIELD.replace(/ /g, "").split(",");
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    ids.forEach((id) => {
      form.subscribeToFieldState(id, (fieldMeta) => {
        setState((prev) => ({ ...prev, [id]: fieldMeta.value }));
      });
    });

    setLoading(false);
  }, []);

  function renderSwitch(param) {
    switch (param) {
      case "Builder":
        return <Page props={state} />;
        break;
      case "Component":
        return <Test props={state} />;
        break;
    }
  }

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "1rem",
        maxHeight: "500px",
        overflow: "scroll",
      }}
    >
      {loading ? <div>Loading...</div> : <>{renderSwitch(COMPONENT_NAME)}</>}
    </div>
  );
}

export default function Field() {
  return (
    <Wrapper>
      <FieldElement />
    </Wrapper>
  );
}
