import { Button } from "./Button";
import { Container } from "./Container";
import { Image } from "./Image";
import { Text } from "./Text";

export default class InView {
  static get Container() {
    return Container;
  }

  static get Text() {
    return Text;
  }

  static get Button() {
    return Button;
  }

  static get Image() {
    return Image;
  }
}
