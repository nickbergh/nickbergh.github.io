import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
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
        <CardDescription className="flex-1 line-clamp-3 mb-4">
          {event.description}
        </CardDescription>
        <Button 
          variant="secondary" 
          className="w-full"
          asChild
        >
          <a 
            href={event.url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View Event
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;