import React from "react";
import Draggable from "react-draggable";

const DragWithOverlay: React.FC = () => {
    return (
        <div style={{ position: "relative", width: "100%" }}>
            <img
                src="/resources/MOCK_rock_wall.jpg" // Replace with your desired image URL
                style={{ width: "100%", height: "auto" }}
                alt="Responsive"
            />
            <Draggable>
                <div
                    style={{
                        position: "absolute",
                        top: "25%",
                        left: "25%",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white box
                        transform: "translate(-50%, -50%)", // This centers the box at the 25% x and 25% position
                    }}
                >
                    {/* Content of the child element */}
                </div>
            </Draggable>
        </div>
    );
};

export default DragWithOverlay;
