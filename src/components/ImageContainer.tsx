import "./ImageContainer.css";

type ImageContainerProps = {
  imagePath: string;
  selected?: boolean;
  onClick?: () => void;
};

export function ImageContainer({ imagePath, selected = false, onClick }: ImageContainerProps) {
  return (
    <button type="button" className={`image-container${selected ? " is-selected" : ""}`} aria-pressed={selected} onClick={onClick}>
      <span className="theme-image" aria-hidden="true" dangerouslySetInnerHTML={{ __html: imagePath }} />
    </button>
  );
}
