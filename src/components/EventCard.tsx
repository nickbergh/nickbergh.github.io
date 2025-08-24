import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { CircleEvent } from '@/types/events';

interface EventCardProps {
  event: CircleEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getSpeakerInfo = (eventId: string) => {
    // Map of event IDs to speaker information
    const speakers: Record<string, string> = {
      'intro-automations-aug28': 'Sarah Chen, Automation Expert',
      'ai-families-sep3': 'Dr. Emily Rodriguez, AI Education Specialist',
    };
    return speakers[eventId];
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
          {event.name}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.start_date)}</span>
          </div>
          <span>{formatTime(event.start_date)}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="flex-1 mb-4">
          {event.description}
        </CardDescription>
        {getSpeakerInfo(event.id) && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Speaker: </span>
            {getSpeakerInfo(event.id)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;