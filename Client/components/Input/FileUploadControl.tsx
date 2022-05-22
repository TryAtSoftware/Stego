import React, { useCallback, useState } from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import { IParentComponentProps } from "@stego/interfaces/IParentComponentProps";
import { IValueChangeProps } from "@stego/interfaces/IValueChangeProps";
import { IFileData } from "@stego/models/common/IFileData";
import { DynamicImage } from "@stego/components/Images/DynamicImage";
import { useService } from "@stego/hooks/useService";
import { uploadFileAsync } from "../../services/stego-service";

const FileUploadInput = styled("input")({ display: "none" });

type FileUploadControlProps = IParentComponentProps & IValueChangeProps<IFileData | null>;
const FileUploadControlComponent = ({ children, currentValue, onChange }: FileUploadControlProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const service = useService();

    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();

        const allFiles = e.target.files;
        const file = allFiles?.[0];
        if (!file) return;

        setIsLoading(true);

        const callResult = await service.call((ac) => uploadFileAsync(file, ac));
        console.log('Upload result: ', callResult);

        if (!callResult.isActive) return;
        if (!callResult.result.isSuccessful()) console.log(callResult.result.getErrorMessages());
        else onChange(callResult.result.getData() ?? null);
        setIsLoading(false);
    }, [onChange, setIsLoading]);
    const handleImageClick = useCallback(() => onChange(null), [onChange]);

    return <Box sx={{ display: "flex", alignItems: "center", columnGap: 5 }}>
        <Box component="label">
            <FileUploadInput accept="image/*" type="file" onChange={handleUpload} />
            {children}
        </Box>
        <Box>
            <Box>
                {isLoading && <CircularProgress size={18} />}
                {!isLoading && <DynamicImage image={currentValue} onClick={handleImageClick} alt="Uploaded image" />}
            </Box>
        </Box>
    </Box>;
};

export const FileUploadControl = React.memo(FileUploadControlComponent);