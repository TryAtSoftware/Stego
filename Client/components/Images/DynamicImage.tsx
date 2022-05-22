import React, { useMemo } from "react";
import { IFileData } from "@stego/models/common/IFileData";
import { IExtensibleProps } from "@stego/interfaces/IExtensibleProps";
import Image from "next/image";
import { buildFileUrl } from "@stego/services/utilities";

interface IDynamicImageProps extends IExtensibleProps {
    image: IFileData | null;
    onClick?: () => void;
    alt: string;
}

const DynamicImageComponent = ({ alt, className, image, onClick }: IDynamicImageProps): JSX.Element | null => {
    const src = useMemo((): string | undefined => buildFileUrl(image?.id), [image]);

    if (!src) return null;
    return <Image className={className} src={src} alt={alt} width={150} height={150} onClick={onClick} />;
};

export const DynamicImage = React.memo(DynamicImageComponent);