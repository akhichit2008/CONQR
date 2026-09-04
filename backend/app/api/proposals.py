from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.proposal import Proposal
from app.models.user import User
from app.schemas.proposal import CreateProposalRequest, ProposalResponse
from app.services.auth import get_current_user

router = APIRouter(prefix="/proposals", tags=["proposals"])


@router.post("", response_model=ProposalResponse)
def create_proposal(
    body: CreateProposalRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Proposal:
    proposal = Proposal(user_id=current_user.id, **body.model_dump())
    db.add(proposal)
    db.commit()
    db.refresh(proposal)
    return proposal


@router.get("", response_model=list[ProposalResponse])
def list_proposals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Proposal]:
    return (
        db.query(Proposal)
        .filter(Proposal.user_id == current_user.id)
        .order_by(Proposal.created_at.desc())
        .all()
    )
