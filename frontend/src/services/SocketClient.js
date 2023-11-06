import { Howl, Howler } from "howler";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import audiobell from "../audio/notifyOrder.mp3";
import notifySlice from "../redux/slice/notifySlice";
Howler.autoUnlock = true;
// Howler.autoSuspend = true;
export default function SocketClient() {
  const { connection } = useSelector((state) => state.socket);
  const { info } = useSelector((state) => state.employee);
  const canPlaysound = useRef(true);
  const dispatch = useDispatch();

  const sound = useRef(
    new Howl({
      src: [audiobell],
      buffer: true,
    })
  );

  useEffect(() => {
    connection &&
      connection.on("new-order", (newOrder) => {
        const checkUser = newOrder.recipients?.find((r) => r._id === info._id);
        if (Object.keys(info).length && checkUser) {
          dispatch(notifySlice.actions.addNotify(newOrder));
          if (canPlaysound.current) {
            canPlaysound.current = false;
            sound.current.play();
          }
        }
      });
  }, [connection]);

  useEffect(() => {
    connection &&
      connection.on("assign-order", (assignOrder) => {
        if (
          Object.keys(info).length &&
          assignOrder.recipients?.includes(info._id)
        ) {
          dispatch(notifySlice.actions.addNotify(assignOrder));
          if (canPlaysound.current.current) {
            canPlaysound.current = false;
            sound.current.play();
          }
        }
      });
  }, [connection]);

  useEffect(() => {
    // Fires when the sound.current finishes playing.
    sound.current.on("end", function () {
      canPlaysound.current = true;
    });
  }, []);

  return <></>;
}
