import { Callout, Flex, Link } from "@radix-ui/themes";
import { IAlertType } from "./types";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function CustomAlert({ type, content }: IAlertType) {
  return (
    <Flex direction="column" gap="3">
      <Callout.Root color="green">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          {content}
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}
