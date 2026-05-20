import Typewriter from "typewriter-effect";

export const Wave1 = ({ text }: { text: string }) => (
  <div className="inline-block text-white">
    <Typewriter
      options={{
        strings: [text],
        autoStart: true,
        deleteSpeed: 200,
        loop: true,
        wrapperClassName: "text-white",
        cursorClassName: "text-white font-light"
      }}
    />
  </div>
);
