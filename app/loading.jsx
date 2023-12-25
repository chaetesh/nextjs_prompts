"use client"
import Lottie from "lottie-react";
import loading from "../styles/loading.json"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Lottie animationData={loading} loop={true} style={{ width: "20vw" }}></Lottie>
  );
}
