import { useRef, useState } from "react";
import { Range, useThumbOverlap, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 5;
const MAX = 30;
const COLORS = ["#0C2960", "#276EF1", "#9CBCF8", "#ccc"];
const THUMB_SIZE = 30;

const ThumbLabel = ({ rangeRef, values, index }) => {
    const [labelValue, style] = useThumbOverlap(rangeRef, values, index);
    return (
        <div
            data-label={index}
            style={{
                display: "block",
                position: "absolute",
                top: "50px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#548BF4",
                whiteSpace: "nowrap"
                // ...(style as React.CSSProperties)
            }}
        >
            {labelValue}
        </div>
    );
};

const RangeBar = ({ onChange }) => {

    const [value, setValue] = useState([5]);

    const rangeRef = useRef();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"

            }}
        >
            <Range
            ref={rangeRef}
                allowOverlap
                step={STEP}
                min={MIN}
                max={MAX}
                values={value}
                onChange={(values) => {
                    setValue(values)
                    onChange(values[0])
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            justifyContent:"center",
                            width: "100%"
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "25%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values: value,
                                    colors: COLORS,
                                    min: MIN,
                                    max: MAX
                                }),
                                alignSelf: "center"
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, index, isDragged }) => {
                    return (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: `${THUMB_SIZE}px`,
                                width: `${THUMB_SIZE}px`,
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA"
                            }}
                        >
                            <ThumbLabel
                                rangeRef={rangeRef.current}
                                values={value}
                                index={index}
                            />
                            {/* <ThumbLabelFull
                  rangeRef={this.rangeRef.current}
                  values={this.state.values}
                  index={index}
                /> */}
                            <div
                                style={{
                                    height: "16px",
                                    width: "5px",
                                    backgroundColor: isDragged ? "#548BF4" : "#CCC"
                                }}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
}

export default RangeBar;