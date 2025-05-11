import { ChatInput } from "./ChatInput"

interface InitialViewProps {
  onSendMessage: (message: string) => void
}

export const InitialView = ({ onSendMessage }: InitialViewProps) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center p-6 md:p-8 overflow-auto">
      <div className="w-full max-w-[800px]">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  )
}
