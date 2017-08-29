from Acquisition import aq_inner
from Products.Five import BrowserView
from datetime import date, datetime, timedelta
from DateTime import DateTime
import time

class ContextToolsView(BrowserView):

    def isEventPast(self, event):
        """ Checks if the event is already past """
        if event.portal_type != 'Event':
            return False
        else:
            try:
                t = DateTime(time.time())
                if event.end is not None:
                    end = DateTime(event.end)
                    return end.year() < t.year() or (end.year() == t.year() and end.month() < t.month()) or(end.year() == t.year() and end.month() == t.month() and end.day() < t.day())
                else:
                    start = DateTime(event.start)
                    return start.year() < t.year() or (start.year() == t.year() and start.month() < t.month()) or(start.year() == t.year() and start.month() == t.month() and start.day() < t.day())
            except:
                return False
        return True

    def isEventPermanent(self, event):
        NUM_YEARS = 2
        YEAR = 365
        YEAR_EXTRA = 365.25
        YEAR_DIFF = YEAR * NUM_YEARS
        YEARS_DIFF_EXTRA = YEAR_EXTRA * NUM_YEARS

        if event.portal_type != 'Event':
            return False
        else:
            try:
                t = DateTime(time.time())
                if event.end != None and event.start != None:
                    end = event.end
                    start = event.start
                    today = datetime.today().date()

                    diff = end.date() - start.date()
                    if (diff >= timedelta(days=YEAR_DIFF) or diff >= timedelta(days=YEARS_DIFF_EXTRA)) and start.date() <= today:
                        return True

                    return False
            except:
                return False
        return True

    def getCollectionItems(self, item):
        collection = item.getObject()

        results = []
        if collection is not None:
            results = collection.queryCatalog()

        return results


class OnlineExperienceView(BrowserView):

    def getSlideshowItems(self):
        context = self.context
        inc = 2
        nthchild = 1

        inline_css = ""
        template = ".cd-fixed-bg:nth-child(%s) { background-image: url('%s');}"

        if 'slideshow' in context:
            slideshow = context['slideshow']
            for _id in slideshow:
                obj = slideshow[_id]
                if obj:
                    portal_type = getattr(obj, 'portal_type', None)
                    if portal_type == "Image":
                            url = obj.absolute_url()+"/@@images/image/large"
                            new_image = template % (nthchild, url)
                            inline_css += new_image
                            nthchild += inc

        final_inline_css = "<style>" + inline_css + "</style>"
        return final_inline_css

