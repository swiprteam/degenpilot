import missing from "../assets/missing.png";

const FallbackImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img src={src} alt={alt} onError={(e: any) => (e.target.src = missing)} />
  );
};

export default FallbackImage;
