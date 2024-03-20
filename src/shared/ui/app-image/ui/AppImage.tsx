import {
  FC,
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from "react";

type AppImageProps = {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
} & ImgHTMLAttributes<HTMLImageElement>;

export const AppImage: FC<AppImageProps> = memo((props) => {
  const {
    className,
    src,
    alt = "image",
    errorFallback,
    fallback,
    ...other
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? "";
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return <img className={className} src={src} alt={alt} {...other} />;
});
