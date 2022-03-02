import { Fragment, useMemo } from "react";
import AnimatedNumberItem from "./AnimatedNumberItem";
import "./AnimatedNumber.scss";

export interface AnimatedNumberProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: number;
  size?: number;
  hasComma?: boolean;
  duration?: number;
  order?: "asc" | "desc";
}

const AnimatedNumber = ({
  value,
  size = 14,
  hasComma = false,
  duration = 200,
  style,
  className,
  order = "asc",
  ...restProps
}: AnimatedNumberProps) => {
  const numberArray = useMemo(() => {
    return String(value).split("").reverse();
  }, [value]);

  const isMinus = useMemo(() => {
    return numberArray[0] === "-";
  }, [numberArray]);

  const decimalPointIndex = useMemo(() => {
    return numberArray.findIndex((value) => value === ".");
  }, [numberArray]);

  const decimalLength = useMemo(() => {
    return decimalPointIndex > -1 ? numberArray.length - decimalPointIndex : 0;
  }, [numberArray, decimalPointIndex]);

  return (
    <div
      className={
        className
          ? `ReactAwesomeAnimatedNumber ${className}`
          : "ReactAwesomeAnimatedNumber"
      }
      style={{ ...style, height: size }}
      {...restProps}
    >
      {numberArray.map((number, index) => {
        const isInt = decimalLength ? index < decimalPointIndex : true;
        const isCommaNeeded =
          hasComma &&
          isInt &&
          (decimalLength + index) % 3 === 0 &&
          index !== 0 &&
          (isMinus ? index !== 1 : true);

        return (
          <Fragment key={index}>
            {isCommaNeeded && (
              <div
                className="ReactAwesomeAnimatedNumber__text"
                style={{
                  fontSize: size,
                  height: size,
                }}
              >
                ,
              </div>
            )}
            {isNaN(Number(number)) ? (
              <div
                className="ReactAwesomeAnimatedNumber__text"
                style={{
                  fontSize: size,
                  height: size,
                }}
              >
                {number}
              </div>
            ) : (
              <AnimatedNumberItem
                number={Number(number)}
                size={size}
                duration={duration}
                order={order}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default AnimatedNumber;
