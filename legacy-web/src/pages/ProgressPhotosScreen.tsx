import { useState } from "react";
import SubpageHeader from "../components/SubpageHeader";
import "../styles/profile.css";

type ProgressPhotosScreenProps = {
  onBack: () => void;
};

export default function ProgressPhotosScreen({ onBack }: ProgressPhotosScreenProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  function onPick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((current) => [url, ...current]);
  }

  return (
    <div className="subpage-screen">
      <SubpageHeader title="Progress Photos" onBack={onBack} />
      <section className="subpage-card">
        <h2>{photos.length ? `${photos.length} saved` : "No photos yet"}</h2>
        <p>Add a photo to track visible change alongside weight and measurements.</p>
        {photos.length > 0 && (
          <div className="subpage-list">
            {photos.map((src) => (
              <img
                key={src}
                src={src}
                alt="Progress"
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, marginTop: 10 }}
              />
            ))}
          </div>
        )}
      </section>
      <label className="subpage-cta" style={{ display: "grid", placeItems: "center" }}>
        Add photo
        <input type="file" accept="image/*" hidden onChange={onPick} />
      </label>
    </div>
  );
}
