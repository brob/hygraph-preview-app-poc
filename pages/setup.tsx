import { useApp, Wrapper } from "@graphcms/app-sdk-react";
import { Box, Button, Text, Heading, Stack, Label, Input } from "@hygraph/baukasten";
import { useState } from "react";

function ConfigureForm({url, handleChange}) {
    return (
        <Stack gap="12">
            <Label htmlFor="url">URL</Label>
            <Input name="url" onChange={handleChange} value={url} />
        </Stack>
    )
}


function SetupElement() {
    const { installation } = useApp();
    if (installation.status === "COMPLETED") {
        return <Configure />;
    }
    return <Install />;
}

function Install() {
    const { updateInstallation } = useApp();
    console.log(useApp())
    const [url, setUrl] = useState("")
    const handleChange = (e) => {
        setUrl(e.target.value)
    }
    return (
        <Stack gap="12">
            <Box>
                <Heading>Hygraph Boilerplate App</Heading>
                <Text>This is an example app</Text>
                <ConfigureForm handleChange={handleChange} url={url} />
                <Button
                    onClick={() =>
                        updateInstallation({ status: "COMPLETED", config: {
                            url
                        } })
                    }
                >
                    Install App
                </Button>
            </Box>
        </Stack>
    );
}

function Configure() {
    const { updateInstallation, installation } = useApp();
    const [url, setUrl] = useState(installation.config.url || "")
    const handleChange = (e) => {
        setUrl(e.target.value)
    }
    console.log(url, installation)
    return (
        <Stack gap="12">
            <Box>
                <Heading>Hygraph Boilerplate App</Heading>
                <Text>This is an example app</Text>
                <ConfigureForm handleChange={handleChange} url={url} />

                <Button
                    onClick={() =>
                        updateInstallation({ status: "COMPLETED", config: {
                            url
                        } })
                    }
                >
                    Save
                </Button>
            </Box>
        </Stack>
    );
}

export default function Setup() {
    return (
        <Wrapper>
            <SetupElement />
        </Wrapper>
    );
}
