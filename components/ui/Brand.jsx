
import Img from "./Img";

export default function Brand({ c, priority = false }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      dir="ltr"
    >
      <Img
        src={c.brand.logo}
        alt="Media Sharks"
        width={100}
        height={100}
        priority={priority}
        className="h-14 w-14 object-contain sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]"
      />
    </span>
  );
}
